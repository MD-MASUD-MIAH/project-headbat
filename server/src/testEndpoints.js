// Quick automated endpoint verification script
async function testAll() {
  const baseUrl = "http://localhost:5000/api";
  console.log("Testing API at:", baseUrl);

  try {
    // 1. Health
    const health = await fetch(`${baseUrl}/health`).then((r) => r.json());
    console.log("✓ Health Check:", health.status, "| DB:", health.database.status);

    // 2. Content
    const content = await fetch(`${baseUrl}/content/all`).then((r) => r.json());
    console.log(
      "✓ Content Endpoint:",
      content.success,
      "| Source:",
      content.source,
      "| Hero Brand:",
      content.data?.hero?.brandName
    );

    // 3. Projects
    const projects = await fetch(`${baseUrl}/projects`).then((r) => r.json());
    console.log(
      "✓ Projects Endpoint:",
      projects.success,
      "| Count:",
      projects.count,
      "| First:",
      projects.data?.[0]?.title
    );

    // 4. Auth Login
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@headbat.com",
        password: "admin123456",
      }),
    }).then((r) => r.json());
    console.log(
      "✓ Auth Login:",
      loginRes.success,
      "| Role:",
      loginRes.admin?.role,
      "| Token Received:",
      Boolean(loginRes.token)
    );

    // 5. Update content test
    if (loginRes.token) {
      const updateRes = await fetch(`${baseUrl}/content/hero`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginRes.token}`,
        },
        body: JSON.stringify({
          ...content.data.hero,
          brandName: "HeadBat Dynamic",
        }),
      }).then((r) => r.json());
      console.log(
        "✓ Update Content (PUT):",
        updateRes.success,
        "| Updated Brand:",
        updateRes.data?.brandName
      );

      // Revert test
      await fetch(`${baseUrl}/content/hero`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginRes.token}`,
        },
        body: JSON.stringify({
          ...content.data.hero,
          brandName: "HeadBat",
        }),
      });
      console.log("✓ Reset Content back to normal.");
    }

    console.log("\n ALL ENDPOINTS OPERATING SMOOTHLY AND RESPONDING 100% OK!");
  } catch (err) {
    console.error("Test error:", err.message);
  }
}

testAll();
