import { showPromptUsernameAtom, usernameAtom } from '@/lib/jotai';
import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const AskUsername = () => {
	const [username, setUsername] = useAtom(usernameAtom);
	const [showPromptUsername, setShowPromptUsername] = useAtom(
		showPromptUsernameAtom
	);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const usernameCheck = () => {
			if (username === null) {
				Swal.fire({
					title: 'Ingin mengatur username?',
					confirmButtonText: 'Ya',
					showCancelButton: true,
					cancelButtonText: `Nanti aja`,
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						Swal.fire({
							title: 'Masukkan username',
							input: 'text',
							inputAttributes: {
								autocapitalize: 'off',
							},
							showCancelButton: true,
							confirmButtonText: 'Simpan',
							showLoaderOnConfirm: true,
							preConfirm: (login) => {
								setUsername(login);
							},
						});
					} else if (result.isDenied) {
						Swal.fire('Changes are not saved', '', 'info');
					}
				});
			}
		};

		const usernameCheckTimeout = setTimeout(() => {
			usernameCheck();
		}, 200);

		return () => {
			clearTimeout(usernameCheckTimeout);
		};
	}, [username]);

	useEffect(() => {
		if (showPromptUsername) {
			Swal.fire({
				title: 'Atur ulang username',
				input: 'text',
				inputValue: username,
				inputAttributes: {
					autocapitalize: 'off',
					autofocus: 'true',
				},
				showCancelButton: true,
				confirmButtonText: 'Simpan',
				showLoaderOnConfirm: true,
				preConfirm: (login) => {
					setUsername(login);
				},
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: 'Username berhasil diatur',
						icon: 'success',
						timer: 1000,
						showConfirmButton: false,
					});
				} else {
					setShowPromptUsername(false);
				}
			});
		}
	}, [showPromptUsername]);

	return null;
};

export default AskUsername;
