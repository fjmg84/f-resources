<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import type { ToastType } from 'svelte-toasts/types/common';

	export let form;

	const showToast = ({
		title,
		description,
		type
	}: {
		title: string;
		description: string;
		type: ToastType;
	}) => {
		toasts.add({
			title,
			description,
			duration: 10000, // 0 or negative to avoid auto-remove
			placement: 'top-right',
			type,
			theme: 'dark',
			onClick: () => {},
			onRemove: () => {}
			// component: BootstrapToast, // allows to override toast component/template per toast
		});

		//toast.remove()
	};

	if (form?.error) showToast({ title: 'Error', description: form.message, type: 'error' });

	if (form?.success) showToast({ title: 'Info', description: form.message, type: 'success' });
</script>

<ToastContainer placement="bottom-right" let:data>
	<FlatToast {data} />
	<!-- Provider template for your toasts -->
</ToastContainer>
