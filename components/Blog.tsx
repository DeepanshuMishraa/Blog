'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  image: string
  author: Author
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/v1/posts")
        setBlogs(response.data.posts)
      } catch (err) {
        setError("Failed to fetch blog posts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48 w-full">
        <img
          src={post.image}
          alt={post.title}
          className="rounded-t-lg object-cover"
        />
      </div>
      <CardHeader>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-sm text-muted-foreground">{post.description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
          <AvatarFallback>{post.author.name}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{post.author.name}</p>
          <p className="text-xs text-muted-foreground">{post.author.role}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="h-full flex flex-col">
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="flex-grow">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Oops!</h1>
      <p className="text-xl text-muted-foreground">{message}</p>
    </div>
  )
}
