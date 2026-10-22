import { useState } from "react";
import { useContent } from "../context/ContentContext";
import api from "../services/api";

export default function ContactFooter() {
  const { content } = useContent();
  const data = content?.contactFooter || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedCaptcha, setSelectedCaptcha] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "" &&
    selectedCaptcha === "headphones";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setSubmitStatus(null);
      await api.submitContactMessage(formData);
      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully. We'll be in touch within 24 hours.",
      });
      setFormData({ name: "", email: "", message: "" });
      setSelectedCaptcha(null);
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: err.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = data.socials || [
    { name: "Twitter", url: "https://x.com/Bogdanlifestyle" },
    { name: "Instagram", url: "https://www.instagram.com/nixtioagency/" },
    { name: "Dribbble", url: "https://dribbble.com/Nixtio" },
    { name: "Behance", url: "https://www.behance.net/Nixtio" },
    { name: "Facebook", url: "https://www.facebook.com/nixtioagency" },
    {
      name: "Pinterest",
      url: "https://www.pinterest.com/NixtioDigitalAgency/",
    },
    { name: "Linkedin", url: "https://www.linkedin.com/company/nixtioagency/" },
    { name: "Clutch", url: "https://clutch.co/profile/nixtio-digital-agency" },
    {
      name: "Designrush",
      url: "https://www.designrush.com/agency/profile/nixtio",
    },
  ];

  return (
    <footer
      data-theme="dark"
      data-aos="fade-up"
      id="contact"
      className="w-full bg-[#080808] text-white pt-20 md:pt-28 pb-12 selection:bg-white selection:text-black"
    >
      {/* Container: 1300px max-width, w-11/12 on mobile, no horizontal padding */}
      <div className="w-11/12 max-w-[1300px] mx-auto px-0 flex flex-col gap-20 md:gap-28">
        {/* Top Content: 2-Column Split Layout */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          {/* Left Column: Heading, Subtitle, Divider, and Features */}
          <div className="flex-1 flex flex-col items-start gap-10 md:gap-12 max-w-xl">
            {/* Title */}
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-semibold text-white tracking-tight leading-[0.95]">
              {data.heading ? (
                data.heading.includes("\n") ? (
                  data.heading.split("\n").map((part, i) => (
                    <span key={i}>
                      {part}
                      <br />
                    </span>
                  ))
                ) : (
                  <>
                    {data.heading}
                  </>
                )
              ) : (
                <>
                  Let's <br /> talk
                </>
              )}
            </h2>

            {/* Description */}
            <p className="text-xl sm:text-2xl md:text-[1.75rem] text-neutral-400 font-normal leading-snug">
              <strong className="text-white font-semibold">
                {data.pitchHighlight || "Have an idea in mind"}
              </strong>
              {data.pitchText || " — website, app, or rebrand? Let's make it real."}
            </p>

            {/* Divider Line */}
            <div className="w-full h-px bg-neutral-800" />

            {/* 2 Feature Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {/* Feature 1 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 flex items-center justify-center text-white shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 25 25"
                      className="w-5 h-5"
                    >
                      <path
                        fill="#fff"
                        d="m11.166 15.072 9.375-9.375a.782.782 0 0 1 1.105 1.106l-9.375 9.375a.782.782 0 0 1-1.105-1.106M12.5 8.594a6.2 6.2 0 0 1 1.996.325.781.781 0 1 0 .499-1.48 7.812 7.812 0 0 0-10.26 8.272.78.78 0 0 0 .776.695q.042.001.087-.005a.78.78 0 0 0 .69-.862A6.257 6.257 0 0 1 12.5 8.594m9.74 1.27a.783.783 0 0 0-1.439.116.78.78 0 0 0 .049.596 9.4 9.4 0 0 1 .488 7.394l-17.686-.007A9.4 9.4 0 0 1 12.5 5.469h.086c1.455.009 2.887.36 4.181 1.025a.781.781 0 1 0 .713-1.39 10.937 10.937 0 0 0-15.298 13.38 1.57 1.57 0 0 0 1.476 1.047h17.683a1.56 1.56 0 0 0 1.475-1.046 10.97 10.97 0 0 0-.576-8.623z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                    {data.feature1Title || "Quick response."}
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                  {data.feature1Description || "We'll reach out within 24 hours to discuss your goals and expectations."}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 flex items-center justify-center text-white shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 25 25"
                      className="w-5 h-5"
                    >
                      <path
                        fill="#fff"
                        d="M24.219 5.469a.78.78 0 0 1-.782.781H18.75v3.906a.78.78 0 0 1-.781.781H13.28v3.907a.78.78 0 0 1-.781.781H7.813v3.906a.78.78 0 0 1-.782.782H1.563a.781.781 0 1 1 0-1.563H6.25v-3.906a.78.78 0 0 1 .781-.781h4.688v-3.907a.78.78 0 0 1 .781-.781h4.688V5.469a.78.78 0 0 1 .78-.782h5.47a.78.78 0 0 1 .78.782"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                    {data.feature2Title || "Clear next steps."}
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                  {data.feature2Description || "After the consultation, we'll provide you with a detailed plan and timeline."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Box */}
          <div className="w-full lg:w-[490px] shrink-0 bg-white text-neutral-900 rounded-[1.5625rem] p-8 md:p-10 shadow-2xl">
            <h3 className="text-2xl md:text-[1.875rem] font-semibold text-neutral-950 tracking-tight mb-8">
              {data.formTitlePrefix || "Have a project "}{" "}
              <span className="text-neutral-400 font-normal">{data.formTitleHighlight || "in mind?"}</span>
            </h3>

            {submitStatus && (
              <div
                className={`p-4 rounded-xl text-xs font-medium mb-6 ${
                  submitStatus.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              {/* Form Input Fields */}
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold text-neutral-900"
                  >
                    How should we call you?*
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#f4f4f4] text-neutral-900 text-sm rounded-xl px-4 py-3.5 outline-none focus:ring-1 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-neutral-900"
                  >
                    E-mail*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#f4f4f4] text-neutral-900 text-sm rounded-xl px-4 py-3.5 outline-none focus:ring-1 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold text-neutral-900"
                  >
                    Message*
                  </label>
                  <input
                    id="message"
                    name="message"
                    type="text"
                    required
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#f4f4f4] text-neutral-900 text-sm rounded-xl px-4 py-3.5 outline-none focus:ring-1 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* Custom Captcha Icon Selector */}
              <div className="flex flex-col gap-3 pt-1">
                <p className="text-xs text-neutral-600 font-normal">
                  Please prove you are a human by selecting the headphones:
                </p>
                <div className="flex items-center gap-3">
                  {/* Option 1: Headphones */}
                  <button
                    type="button"
                    onClick={() => setSelectedCaptcha("headphones")}
                    aria-label="headphones"
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                      selectedCaptcha === "headphones"
                        ? "border-neutral-900 bg-neutral-100 shadow-inner"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-neutral-900"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 3.5c-5.379 0-9.75 4.297-9.75 9.61v4.29a3.54 3.54 0 0 0 3.54 3.54h.96a.5.5 0 0 0 .5-.5v-6.08a.5.5 0 0 0-.5-.5h-.96a3.53 3.53 0 0 0-2.54 1.073V13.11C3.25 8.363 7.159 4.5 12 4.5s8.75 3.863 8.75 8.61v1.823a3.53 3.53 0 0 0-2.54-1.073h-.96a.5.5 0 0 0-.5.5v6.08a.5.5 0 0 0 .5.5h.96a3.54 3.54 0 0 0 3.54-3.54v-4.29c0-5.313-4.371-9.61-9.75-9.61m8.75 13.9a2.54 2.54 0 0 0-2.54-2.54h-.46v5.08h.46a2.54 2.54 0 0 0 2.54-2.54m-17.5 0a2.54 2.54 0 0 0 2.54 2.54h.46v-5.08h-.46a2.54 2.54 0 0 0-2.54 2.54" />
                    </svg>
                  </button>

                  {/* Option 2: Mail Letter */}
                  <button
                    type="button"
                    onClick={() => setSelectedCaptcha("letter")}
                    aria-label="letter"
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                      selectedCaptcha === "letter"
                        ? "border-neutral-900 bg-neutral-100 shadow-inner"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-neutral-900"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M1 4c0-.552.532-1 1.19-1h19.62c.658 0 1.19.448 1.19 1v16c0 .552-.532 1-1.19 1H2.19C1.531 21 1 20.552 1 20zm19.655 0H3.332l7.468 7.234a1.86 1.86 0 0 0 2.384.002h.002zM2.19 19.17l6.57-8.23-6.57-6.485zm7.415-7.525L2.876 20h18.253l-6.655-8.431-.449.374c-1.15.966-2.903.964-4.06.003l-.002-.001zm12.207-7.2v14.718l-6.493-8.299z" />
                    </svg>
                  </button>

                  {/* Option 3: User Avatar */}
                  <button
                    type="button"
                    onClick={() => setSelectedCaptcha("user")}
                    aria-label="user"
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                      selectedCaptcha === "user"
                        ? "border-neutral-900 bg-neutral-100 shadow-inner"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-neutral-900"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.33 10.49a2.97 2.97 0 1 1 5.94 0 2.97 2.97 0 0 1-5.94 0m2.97-1.97a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94M12.5 2.75c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75-4.365-9.75-9.75-9.75M3.75 12.5a8.75 8.75 0 1 1 14.42 6.664v-.784a3.46 3.46 0 0 0-3.46-3.46h-4.43a3.46 3.46 0 0 0-3.46 3.46v.776A8.73 8.73 0 0 1 3.75 12.5m4.06 7.389a8.7 8.7 0 0 0 4.69 1.361 8.7 8.7 0 0 0 4.681-1.356.5.5 0 0 1-.01-.104v-1.41a2.46 2.46 0 0 0-2.46-2.46h-4.43a2.46 2.46 0 0 0-2.46 2.46v1.41a.5.5 0 0 1-.01.099" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Status notification */}
              {submitStatus && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-medium leading-relaxed ${
                    submitStatus.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button with Rolling Text */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`group/btn relative w-full inline-flex items-center justify-center text-sm font-semibold py-4 rounded-full overflow-hidden transition-all duration-300 ${
                  isFormValid && !isSubmitting
                    ? "bg-neutral-950 text-white cursor-pointer hover:bg-neutral-800"
                    : "bg-[#737373] text-white/90 cursor-not-allowed"
                }`}
              >
                <span className="relative block overflow-hidden h-[1.3rem]">
                  <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:-translate-y-1/2">
                    <span className="block leading-[1.3rem] whitespace-nowrap">
                      {isSubmitting
                        ? "Sending..."
                        : data.submitButtonText || "Send Message"}
                    </span>
                    <span className="block leading-[1.3rem] whitespace-nowrap">
                      {isSubmitting
                        ? "Sending..."
                        : data.submitButtonText || "Send Message"}
                    </span>
                  </span>
                </span>
              </button>

              {/* Disclaimer */}
              <p className="text-[11px] text-neutral-400 font-normal leading-normal">
                By submitting, you agree to our{" "}
                <a
                  href="/privacy"
                  className="text-neutral-900 underline hover:opacity-70 transition-opacity"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/cookie-policy"
                  className="text-neutral-900 underline hover:opacity-70 transition-opacity"
                >
                  Cookie Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="flex flex-col gap-12 pt-8">
          {/* Social Links Grid with Top Dribbble Badge */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-6 gap-x-4 items-center">
            {/* Dribbble Trophy Select Badge */}
            <div className="row-span-2 flex items-center">
              <a
                href="https://dribbble.com/web-design-company"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-300 inline-block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  fill="none"
                  viewBox="0 0 80 80"
                >
                  <path
                    fill="#fff"
                    stroke="#0A0A0A"
                    strokeMiterlimit="10"
                    strokeWidth="1.381"
                    d="M41.533 77.445a2.47 2.47 0 0 1-2.548.002L9.77 59.86a2.47 2.47 0 0 1-1.195-2.114V4.507a2.47 2.47 0 0 1 2.468-2.468H69.38a2.47 2.47 0 0 1 2.47 2.468v53.24a2.47 2.47 0 0 1-1.193 2.114z"
                  />
                  <path
                    fill="#0A0A0A"
                    d="M41.533 77.445a2.47 2.47 0 0 1-2.548.002L9.77 59.86a2.47 2.47 0 0 1-1.195-2.114V4.507a2.47 2.47 0 0 1 2.468-2.468H69.38a2.47 2.47 0 0 1 2.47 2.468v53.24a2.47 2.47 0 0 1-1.193 2.114z"
                  />
                  <path
                    fill="#fff"
                    d="M71.171 4.507c0-.991-.803-1.793-1.794-1.794H11.038c-.99 0-1.794.803-1.794 1.794v53.238c0 .63.33 1.213.868 1.538L39.328 76.87c.57.343 1.284.343 1.854-.001l29.122-17.584c.538-.326.867-.91.867-1.538zm1.348 53.24a3.14 3.14 0 0 1-1.432 2.635l-.087.055L41.878 78.02a3.14 3.14 0 0 1-3.149.057l-.094-.055L9.42 60.436A3.14 3.14 0 0 1 7.9 57.848l-.002-.103V4.507a3.14 3.14 0 0 1 3.141-3.14h58.337a3.14 3.14 0 0 1 3.143 3.14z"
                  />
                  <path
                    fill="#fff"
                    d="M28.217 56.177a.62.62 0 0 0-.252-.458q-.223-.164-.603-.164-.259 0-.437.073a.6.6 0 0 0-.273.198.47.47 0 0 0-.094.288.4.4 0 0 0 .057.234q.069.106.173.174.11.07.254.124.144.051.308.088l.448.107q.329.075.602.196.273.123.474.3.2.18.31.421.112.242.115.554c.005.283-.076.561-.234.796a1.5 1.5 0 0 1-.665.521q-.434.183-1.043.183-.606 0-1.055-.185a1.54 1.54 0 0 1-.698-.55q-.25-.366-.262-.907h1.024a.78.78 0 0 0 .144.42.8.8 0 0 0 .344.252q.218.083.49.083.242.005.467-.078a.7.7 0 0 0 .31-.218.5.5 0 0 0 .11-.319.42.42 0 0 0-.1-.283.76.76 0 0 0-.288-.195 3 3 0 0 0-.462-.147l-.544-.137q-.633-.153-1-.482-.365-.326-.363-.88a1.3 1.3 0 0 1 .242-.795q.247-.34.677-.53t.976-.19q.556 0 .973.19t.649.53a1.4 1.4 0 0 1 .239.786zm2.578 3.564V54.74h3.37v.872h-2.313v1.192h2.14v.872h-2.14v1.194h2.323v.872zm4.997 0V54.74h1.056v4.13h2.145v.872zm4.686 0V54.74h3.37v.872h-2.314v1.192h2.14v.872h-2.14v1.194h2.324v.872z"
                  />
                </svg>
              </a>
            </div>

            {/* Social Item Links */}
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-base md:text-lg font-semibold text-white hover:text-neutral-400 transition-colors"
              >
                <span>{social.name}</span>
                <span className="text-neutral-500 group-hover:text-white transition-colors duration-200">
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-neutral-900 text-sm font-medium">
            <p className="text-neutral-500">
              {data.copyrightText || "© 2010-2026 HeadBat. All rights reserved."}
            </p>

            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                className="text-white hover:text-neutral-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/cookie-policy"
                className="text-white hover:text-neutral-400 transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="/admin"
                className="text-neutral-400 hover:text-white transition-colors text-xs flex items-center gap-1 border border-neutral-800 px-2.5 py-1 rounded-full hover:border-neutral-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                Admin Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
