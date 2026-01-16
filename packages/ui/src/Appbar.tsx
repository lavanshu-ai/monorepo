import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: ()=>void,
    onSignout: ()=>void
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
  return (
  <div className="h-16 flex items-center justify-between border-b px-4  text-white bg-sky-900 ">
    <div className="text-lg font-semibold">
      MudRa
    </div>

    <Button onClick={user ? onSignout : onSignin}>
      {user ? "Logout" : "Login"}
    </Button>
  </div>
);

}