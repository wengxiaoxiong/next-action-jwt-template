# Next-Action-JWT-Template

基于 Next.js 的全栈应用模板，集成了 JWT 认证系统和 Server Actions。

## 技术栈

- **前端框架**: [Next.js 15](https://nextjs.org/) (使用 App Router)
- **UI组件**: [ShadCN UI](https://ui.shadcn.com/)
- **样式方案**: [Tailwind CSS](https://tailwindcss.com/)
- **认证方式**: JWT (JSON Web Token)
- **表单处理**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **数据库**: [Prisma ORM](https://www.prisma.io/) (支持多种数据库)
- **后端API**: Next.js Server Actions

## 功能特点

- ✅ 完整的用户注册/登录/退出系统
- ✅ JWT认证，基于HTTP-only Cookie
- ✅ 服务端渲染与客户端组件协同工作
- ✅ 强类型验证的表单处理
- ✅ 安全的密码哈希处理
- ✅ 响应式现代UI界面
- ✅ Prisma数据库集成

## 快速开始

### 1. 克隆仓库

```bash
git clone <repository-url>
cd next-action-jwt-template
```

### 2. 安装依赖

```bash
sudo pnpm install
```

### 3. 环境配置

创建`.env.local`文件并添加以下内容:

```
# 数据库连接URL
DATABASE_URL="mysql://user:password@localhost:3306/dbname"

# JWT密钥 (生产环境中务必使用强密钥)
JWT_SECRET="your-strong-secret-key"
```

### 4. 数据库迁移

```bash
sudo pnpm prisma generate
sudo pnpm prisma db push
```

### 5. 启动开发服务器

```bash
sudo pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
/
├── app/                   # Next.js App Router结构
│   ├── actions/           # Server Actions
│   │   └── auth.ts        # 认证相关的服务端操作
│   ├── api/               # API路由 (可选)
│   ├── (routes)/          # 应用路由
│   │   ├── login/         # 登录页面
│   │   └── register/      # 注册页面
│   ├── lib/               # 工具库
│   │   ├── auth.ts        # 认证工具
│   │   ├── prisma.ts      # Prisma客户端
│   │   └── validations.ts # Zod表单验证
│   └── page.tsx           # 首页
├── components/            # UI组件
│   ├── ui/                # ShadCN UI组件
│   └── forms/             # 表单组件
├── prisma/                # Prisma配置
│   └── schema.prisma      # 数据库模型
├── public/                # 静态资源
└── ...配置文件
```

## 安全说明

本项目使用JWT（JSON Web Token）进行身份验证，提供了比简单Cookie更安全的认证机制:

1. JWT令牌存储在HTTP-only Cookie中，启用了以下安全措施:
   - HTTP-only: 防止JavaScript访问Cookie
   - Secure: 在生产环境中仅通过HTTPS发送
   - SameSite=strict: 防止CSRF攻击

2. 密码通过bcrypt进行哈希处理，保证原始密码不被存储

3. 所有敏感操作都通过Server Actions执行，避免暴露敏感API端点

## 生产环境部署

推荐使用[Vercel](https://vercel.com)部署此应用。

```bash
sudo pnpm build
```

## 贡献

欢迎提交问题和Pull Requests。

## 许可证

MIT
