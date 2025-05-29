import React from 'react';

import { Icon } from '@iconify/react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAtom, useSetAtom } from 'jotai';
import { showPromptUsernameAtom } from '@/lib/jotai';

const SettingMenu = ({ className }: { className?: string }) => {
	const setShowPromptUsername = useSetAtom(showPromptUsernameAtom);

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger className={className}>
					<Icon icon="ic:outline-menu" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel className="text-black/30">
						Pengaturan
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => {
							setShowPromptUsername(true);
						}}
					>
						Atur Username
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default SettingMenu;
