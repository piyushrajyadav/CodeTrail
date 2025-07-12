import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // Prepare headers with GitHub token if available
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.mercy-preview+json'
    }
    
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    // Fetch user profile
    const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers })
    if (!userResponse.ok) {
      const errorText = await userResponse.text()
      console.error(`GitHub API error for user ${username}:`, userResponse.status, errorText)
      
      if (userResponse.status === 404) {
        throw new Error("User not found")
      } else if (userResponse.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Please try again later.")
      } else {
        throw new Error(`GitHub API error: ${userResponse.status}`)
      }
    }
    const userData = await userResponse.json()

    // Fetch all public repos (up to 100 for demo; for more, implement pagination)
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers
    })
    if (!reposResponse.ok) {
      throw new Error("Failed to fetch repositories")
    }
    const reposData = await reposResponse.json()

    // Aggregate languages from all repos
    const languages = new Set<string>()
    const topics = new Set<string>()
    for (const repo of reposData) {
      // Fetch languages for each repo
      const langRes = await fetch(repo.languages_url, { headers })
      if (langRes.ok) {
        const langData = await langRes.json()
        Object.keys(langData).forEach((lang) => languages.add(lang))
      }
      // Topics (from repo.topics, requires correct Accept header)
      if (repo.topics) repo.topics.forEach((topic: string) => topics.add(topic))
    }

    // Optionally, fetch contribution activity (skipped for now)

    const githubData = {
      profile: {
        login: userData.login,
        name: userData.name,
        bio: userData.bio,
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
        avatar_url: userData.avatar_url,
        html_url: userData.html_url,
        location: userData.location,
        blog: userData.blog,
        company: userData.company,
      },
      repositories: reposData.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics,
        updated_at: repo.updated_at,
        html_url: repo.html_url,
      })),
      languages: Array.from(languages),
      topics: Array.from(topics),
    }

    return NextResponse.json(githubData)
  } catch (error: any) {
    console.error("Error fetching GitHub data:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
