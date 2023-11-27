<script>
	import '../app.postcss';
	import Drawer, { AppContent, Content } from '@smui/drawer';
	import List, { Item, Text } from '@smui/list';
	import logo from '$lib/assets/logo.png';

	let activeTab = 'nothing yet';
</script>

<div class="h-full flex">
	<Drawer>
		<Content class="bg-green-50">
			<a href="/">
				<img class="w-24 m-4" alt="The project logo" src={logo} />
			</a>
			<List>
				<Item
					href="/users"
					on:click={() => (activeTab = 'Users')}
					activated={activeTab === 'Users'}
				>
					<Text>Users</Text>
				</Item>
				<Item
					href="/plants"
					on:click={() => (activeTab = 'Plants')}
					activated={activeTab === 'Plants'}
				>
					<Text>Plants</Text>
				</Item>
			</List>
		</Content>
	</Drawer>

	<AppContent class="w-full h-full overflow-auto bg-white text-black">
		<slot />
	</AppContent>
</div>
