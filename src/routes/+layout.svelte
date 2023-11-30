<script>
	import '../app.postcss';
	import Drawer, { AppContent, Content } from '@smui/drawer';
	import List, { Item, Text } from '@smui/list';
	import { SignedIn } from 'sveltefire';
	import logo from '$lib/assets/logo.png';
	import { FirebaseApp } from 'sveltefire';
	import { auth } from '$lib/firebase';

  import Button, { Label } from '@smui/button';

	let activeTab = 'nothing yet';

</script>

<FirebaseApp {auth}>
	<div class="h-full flex">
		<Drawer>
			<Content class="bg-green-50">
				<div class="flex p-5 justify-between">
					<a href="/">
						<img class="w-24 " alt="The project logo" src={logo} />
					</a>
					<SignedIn let:user let:signOut>
						<div class="text-black">
							<Button color="secondary" on:click={signOut} >
								<Label>Logout</Label>
							</Button>
							<p class="text-xs">{user.email}</p>
						</div>
					</SignedIn>
				</div>
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
</FirebaseApp>
