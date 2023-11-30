<script>
	import { SignedIn } from 'sveltefire';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { auth } from '$lib/firebase'; // your firebase auth instance
	import { userStore } from 'sveltefire';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';

	const user = userStore(auth);

	// const baseUrl = 'https://api.flora.works/v1';
	const baseUrl = 'http://localhost:8000';

	let users = [];

	onMount(async () => {
		await getUsers();
	});

	const getUsers = async () => {
		if (!auth?.currentUser) {
			return;
		}
		const response = await axios.get(`${baseUrl}/user/all-users`, {
			headers: {
				Authorization: `Bearer ${auth?.currentUser?.accessToken}`
			}
		});
		users = response.data;
	};
</script>

<SignedIn let:user>
	<div class="shadow m-20 p-10">
    <h1 class="text-lg font-bold">Users</h1>
    {#each users as user}
      <p class="shadow-sm p-3">{user.email}</p>
    {/each}
	</div>
</SignedIn>
