import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'RSS URL is required' });

  try {
    const response = await axios.get(url);
    const newsData = response?.data?.items;

      res.status(200).json(newsData);
  } catch (error) {
    console.error('RSS Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feed' });
  }
}
