import { getAllActivePolls } from "@/lib/queries/server"

export default async function sitemap() {
  const polls = await getAllActivePolls() // Only fetch public, active polls

  return [
    {
      url: '/',
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'daily' as const,
    },
    ...polls.map(poll => ({
      url: `/poll/${poll.id}`,
      lastModified: poll.created_at,
      priority: poll.total_votes > 1000 ? 0.9 :  0.8,
      changeFrequency: 'weekly' as const,
    }))
  ]
}