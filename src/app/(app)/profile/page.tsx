import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) return <p className="p-4">Carregando perfil...</p>;

  const { name, email, image } = session.user;

  return (
    <div className="flex flex-col items-center mt-8">
      <Avatar className="h-24 w-24">
        <AvatarImage src={image ?? ""} alt={name ?? ""} />
        <AvatarFallback>{name?.[0]}</AvatarFallback>
      </Avatar>

      <p className="text-lg font-medium mt-8">{name}</p>
      <p className="text-sm text-muted-foreground">{email}</p>

      <LogoutButton className="mt-8" />
    </div>
  );
}
