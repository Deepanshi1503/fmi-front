"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import avatar1 from "@/public/images/avatar/avatar-dummy.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/provider/Store";

const ProfileInfo = () => {
  const user = useAppSelector(state => state.user);
  const profileImage = user.profileImage ? process.env.NEXT_PUBLIC_STRAPI_URL + user.profileImage : ''
  const logout = () => {
    localStorage.clear()
    window.location.href=window.location.origin
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
          {profileImage ?
            <Image
              src={profileImage}
              alt={user?.firstName ?? ""}
              width={36}
              height={36}
              className="rounded-full"
            /> : <Image
              src={avatar1.src}
              alt={"Profile"}
              width={36}
              height={36}
              className="rounded-full"
            />
          }
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
          {profileImage ?
            <Image
              src={profileImage}
              alt={user?.firstName ?? ""}
              width={36}
              height={36}
              className="rounded-full"
            /> : <Image
              src={avatar1.src}
              alt={"Profile"}
              width={36}
              height={36}
              className="rounded-full"
            />
          }
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {user?.firstName ?? user.email}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem
          onSelect={() => logout()}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
