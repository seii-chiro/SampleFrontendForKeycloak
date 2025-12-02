import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import type Keycloak from "keycloak-js"

type LogoutButtonProps = {
    keycloak: Keycloak | null;
}

const LogoutButton = ({ keycloak }: LogoutButtonProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="p-0 bg-transparent text-black hover:bg-transparent w-full justify-start cursor-pointer">
                    Logout
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to logout?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={() => keycloak?.logout()}
                        variant="destructive"
                    >
                        Logout
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LogoutButton