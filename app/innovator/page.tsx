import { getCurrentUserWithRedirect } from "../actions/auth";

export default async function Innovator() {
    const user = await getCurrentUserWithRedirect();
    return (
        <div>
            <h1>创新者:{user?.name}</h1>
            <p>邮箱:{user?.email}</p>
            <p>ID:{user?.id}</p>
            <p>这是一个被保护的页面</p>
        </div>
    );
}