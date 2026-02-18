export default function handler(req, res) {
    const rawId = req.query.id;
  
    if (!rawId) {
      return res.status(400).json({
        error: "Missing id parameter",
      });
    }
  
    let targetUrl = rawId;
  
    if (targetUrl.includes("%")) {
      try {
        targetUrl = decodeURIComponent(targetUrl);
      } catch (e) {}
    }
  
    const isShortCode = /^[A-Za-z0-9_\-]+$/.test(targetUrl);
  
    if (isShortCode) {
      targetUrl = "https://link.coupang.com/a/" + targetUrl;
    }
  
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Referrer-Policy", "no-referrer");
    return res.redirect(302, targetUrl);
  }
  