import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { defaultContent } from "../data/defaultContent";
import { projects as fallbackProjects } from "../data/projectsData";

const ContentContext = createContext({
  content: defaultContent,
  projects: fallbackProjects,
  isLoading: false,
  error: null,
  reloadContent: () => {},
  getProjectBySlug: () => null,
  getAdjacentProjects: () => ({ prev: null, next: null, currentIndex: 0, total: 0 }),
});

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [projects, setProjects] = useState(fallbackProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch both content and projects in parallel
      const [contentRes, projectsRes] = await Promise.allSettled([
        api.getContent(),
        api.getProjects(),
      ]);

      if (contentRes.status === "fulfilled" && contentRes.value?.data) {
        setContent((prev) => ({
          ...prev,
          ...contentRes.value.data,
        }));
      }

      if (projectsRes.status === "fulfilled" && projectsRes.value?.data) {
        if (Array.isArray(projectsRes.value.data) && projectsRes.value.data.length > 0) {
          setProjects(projectsRes.value.data);
        }
      }
    } catch (err) {
      console.warn("[ContentContext] Using default fallback data:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Synchronize document title, meta tags, and favicon dynamically from live SEO content
  useEffect(() => {
    try {
      const seo = content?.seo || {};
      const header = content?.header || {};

      // 1. Meta Title
      const title =
        seo.metaTitle || seo.brandName || header.brandName || "HeadBat";
      if (title && document.title !== title) {
        document.title = title;
      }

      // Helper to update or inject meta tag
      const setMetaTag = (attrName, attrVal, contentVal) => {
        if (!contentVal) return;
        let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attrName, attrVal);
          document.head.appendChild(el);
        }
        el.setAttribute("content", contentVal);
      };

      // 2. Meta Description
      if (seo.metaDescription) {
        setMetaTag("name", "description", seo.metaDescription);
      }

      // 3. Meta Keywords
      if (seo.keywords) {
        setMetaTag("name", "keywords", seo.keywords);
      }

      // 4. Meta Author
      if (seo.author) {
        setMetaTag("name", "author", seo.author);
      }

      // 5. OpenGraph Tags
      if (title) setMetaTag("property", "og:title", title);
      if (seo.metaDescription) {
        setMetaTag("property", "og:description", seo.metaDescription);
      }
      if (seo.ogImage) {
        setMetaTag("property", "og:image", seo.ogImage);
      }

      // 6. Dynamic Favicon
      const faviconUrl =
        seo.faviconUrl || seo.favicon || header.logoLight || "/logo2.png";
      if (faviconUrl) {
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "shortcut icon";
          document.head.appendChild(link);
        }
        link.href = faviconUrl;
      }
    } catch (e) {
      console.warn("[ContentContext] Failed to apply SEO metadata:", e);
    }
  }, [content]);

  const getProjectBySlug = useCallback(
    (slug) => {
      if (!slug) return null;
      return (
        projects.find(
          (p) =>
            (p.slug && p.slug.toLowerCase() === slug.toLowerCase()) ||
            (p.id && String(p.id).toLowerCase() === slug.toLowerCase())
        ) || null
      );
    },
    [projects]
  );

  const getAdjacentProjects = useCallback(
    (slug) => {
      const total = projects.length;
      const currentIndex = projects.findIndex(
        (p) =>
          (p.slug && p.slug.toLowerCase() === slug.toLowerCase()) ||
          (p.id && String(p.id).toLowerCase() === slug.toLowerCase())
      );

      if (currentIndex === -1) {
        return { prev: null, next: null, currentIndex: 0, total };
      }

      const prev = projects[(currentIndex - 1 + total) % total];
      const next = projects[(currentIndex + 1) % total];

      return { prev, next, currentIndex, total };
    },
    [projects]
  );

  return (
    <ContentContext.Provider
      value={{
        content,
        projects,
        isLoading,
        error,
        reloadContent: fetchAll,
        getProjectBySlug,
        getAdjacentProjects,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
