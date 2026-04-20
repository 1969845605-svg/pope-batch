export default function handler(req, res) {
  res.setHeader("Content-Type", "application/javascript");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  res.send(`
    window.ENV = {
      api_minimax_key: "${process.env.api_minimax_key || ''}"
    };
  `);
}