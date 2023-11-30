<script>
	import { SignedIn } from 'sveltefire';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { auth } from '$lib/firebase'; // your firebase auth instance
	import Autocomplete from '@smui-extra/autocomplete';
	import Button, { Label } from '@smui/button';
	import CircularProgress from '@smui/circular-progress';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';

  let open = false;
	let selectedPlantPhoto = null;


	const baseUrl = 'https://api.flora.works/v1';
	// const baseUrl = 'http://localhost:8000';

	let userPlants = [];
	let plants = [];
	let loading = false;

	onMount(async () => {
		await getUserPlants();
		await getPlants();
	});

	const getUserPlants = async () => {
		loading = true;
		if (!auth?.currentUser) return;
		const response = await axios.get(`${baseUrl}/admin/user-plants`, {
			headers: {
				Authorization: `Bearer ${auth?.currentUser?.accessToken}`
			}
		});
		userPlants = response.data;
		loading = false;
	};

	const getPlants = async () => {
		if (!auth?.currentUser) return;
		const response = await axios.get(`${baseUrl}/plants`, {
			headers: {
				Authorization: `Bearer ${auth?.currentUser?.accessToken}`
			}
		});
		plants = response.data;
	};

	const updateUserPlant = async (userPlant) => {
		loading = true;
		if (!auth?.currentUser) return;
		const plant = plants.filter((plant) => plant.name === userPlant.plant)[0];
		userPlant.plant = plant._id;
		const response = await axios.put(
			`${baseUrl}/admin/user-plants/${userPlant._key}/change-plant`,
			{
				plant_id: userPlant.plant
			},
			{
				headers: {
					Authorization: `Bearer ${auth?.currentUser?.accessToken}`
				}
			}
		);
		userPlants = response.data;
		await getUserPlants();
		loading = false;
	};
</script>

<SignedIn let:user>
	<div class="shadow m-20 p-10">
		{#if loading}
			<CircularProgress style="height: 32px; width: 32px;" indeterminate />
		{/if}

		<Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
			<Content><img alt="" class="w-full h-full" src={selectedPlantPhoto}  /></Content>
			<Actions>
				<Button on:click={() => (open = false)}>
					<Label>Close</Label>
				</Button>
			</Actions>
		</Dialog>

		{#each userPlants as userPlant}
			<h1 class="text-lg bg-green-600 rounded text-white p-2">{userPlant.email}</h1>
			<div class="p-5 m-5 shadow grid grid-cols-6 place-items-center gap-4">
				<span class="font-bold">Image</span>
				<span class="font-bold">Nickname</span>
				<span class="font-bold">Location</span>
				<span class="font-bold">Plant</span>
				<span class="font-bold" />
				<span class="font-bold" />
				{#each userPlant.plants as plant}
					{#if plant.photo}
						<button type="button" class="hover:cursor-pointer" on:click={() => {selectedPlantPhoto = plant.photo.public_url;  open = true}}>
							<img alt="" class="w-12 h-20" src={plant.photo.thumbnail_url}  />
						</button>
					{:else}
						<span class="">No Image</span>
					{/if}
					<span class="">{plant.nickname}</span>
					<span class="">{plant.location}</span>
					<span class="">{plant.name}</span>
					<Autocomplete
						combobox
						options={plants}
						getOptionLabel={(plant) => (plant ? plant.name : '')}
						bind:value={plant.plant}
						label="Change Plant"
					/>
					<Button
						color="secondary"
						variant="raised"
						class="my-4"
						on:click={() => updateUserPlant(plant)}
					>
						<Label>Update</Label>
					</Button>
				{/each}
			</div>
		{/each}
	</div>
</SignedIn>
