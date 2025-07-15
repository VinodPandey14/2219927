export const logEvent = async (stack, level, pkg, message) => {
  const token = localStorage.getItem("authToken");
  try {
    await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch (err) {
    console.error("Log failed:", err);
  }
};
