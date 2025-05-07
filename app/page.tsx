import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, logout } from "./actions/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">创新者平台</CardTitle>
          <CardDescription>
            Next.js + ShadCN UI + Server Actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="space-y-4">
              <p className="text-lg font-medium">欢迎回来，{user.name || user.email}</p>
              <p>您已成功登录系统。</p>
              <form action={logout}>
                <Button type="submit" className="w-full">注销</Button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <p>您尚未登录。</p>
              <div className="flex flex-col space-y-2">
                <Button asChild className="w-full">
                  <Link href="/login">登录</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/register">注册</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-gray-500">
          <p>这是一个使用Next.js、ShadCN UI和Server Actions构建的登录注册演示系统</p>
        </CardFooter>
      </Card>
    </main>
  );
}
