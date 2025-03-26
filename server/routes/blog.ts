import { Hono } from "hono";
import { Bindings, Variables } from "../src";
import { createBlog, updateBlog } from "@sushantjarial/blog-common";

const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

blogRouter.post("/create", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = createBlog.safeParse(body);
  if (!success) {
    return c.json({ message: "title and content should be string" });
  }
  const prisma = c.get("prisma");
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        published: true,
      },
    });
    c.status(200);
    return c.json({
      id: post.id,
    });
  } catch (e) {
    c.status(501);
    return c.json({ message: "cannot connect to database please try again" });
  }
});
blogRouter.put("/update", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = updateBlog.safeParse(body);
  if (!success) {
    c.json({ message: "title and  content should be string only" });
  }
  const prisma = c.get("prisma");
  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });
    return c.json({ message: "post updated", id: post.id });
  } catch (e) {
    return c.json({
      message: "cannot update the post",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = c.get("prisma");
  const id = c.get("userId");
  const name = await prisma.user.findUnique({
    select: {
      firstName: true,
      lastName: true,
    },
    where: {
      id,
    },
  });
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      id: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return c.json({ posts, name ,id });
});

blogRouter.get("/load/", async (c) => {
  const id = c.req.query("id");
  const userId = c.get("userId");
  const prisma = c.get("prisma");
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    const name = await prisma.user.findUnique({
      select: {
        firstName: true,
        lastName: true,
      },
      where: {
        id: userId,
      },
    });

    return c.json({
      post,
      name,
    });
  } catch (e) {
    return c.json({
      message: "something went wrong",
    });
  }
});
blogRouter.get("/userblogs", async (c) => {
  const id = c.req.query("authorId") || "";
  const prisma = c.get("prisma");
  try {
    const authorBlogs = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      where: {
        authorId: id,
      },
    });
    c.status(200);
    return c.json({ authorBlogs });
  } catch (e) {
    c.status(500);
    return c.json({
      error: e,
    });
  }
});

blogRouter.get("/myblogs", async (c) => {
  const id = c.get("userId");
  const prisma = c.get("prisma");
  try {
    const authorBlogs = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      where: {
        authorId: id,
      },
    });
    c.status(200);
    return c.json({ authorBlogs });
  } catch (e) {
    c.status(500);
    return c.json({
      error: e,
    });
  }
});
blogRouter.delete("/delete", async (c) => {
  const id = c.req.query("blogId") || "";
  const prisma = c.get("prisma");
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });

    c.status(200);
    return c.json({ message: "Post deleted successfully" });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Failed to delete post", error: e });
  }
});

export default blogRouter;
