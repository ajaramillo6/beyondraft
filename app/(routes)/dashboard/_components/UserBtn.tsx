import { useAuth } from '@/app/context_/AuthContext';
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { LogOut } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

const UserBtn = () => {

    const { user } = useAuth();

  return (
    <Popover>
        <PopoverTrigger>
            <Image
                src={user.picture}
                alt="user"
                width={30}
                height={30}
                className="rounded-full"
            />
        </PopoverTrigger>
        <PopoverContent className="mr-7 mt-1 p-4">
            <LogoutLink>
                <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 
                rounded-lg text-sm cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Logout
                </h2>
            </LogoutLink>
            <Separator className="my-2" />
            {user && (
                <div className="mt-2 flex gap-2 items-center">
                {user?.picture && (
                    <Image 
                        src={user?.picture} 
                        alt="user" 
                        width={30} 
                        height={30} 
                        className="rounded-full" 
                    />
                )}
                <div>
                    <h2 className="text-[14px] font-bold">
                        {user?.given_name} {user?.family_name}
                    </h2>
                    <h2 className="text-[12px] text-gray-500">
                        {user?.email}
                    </h2>
                </div>
                </div>
            )}
        </PopoverContent>
    </Popover>
  )
}

export default UserBtn
