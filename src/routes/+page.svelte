<script>
	import { SignedOut } from 'sveltefire';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import { SignedIn } from 'sveltefire';

	let email = '';
	let password = '';
</script>


<SignedIn let:user let:signOut>
	<div class="text-black flex flex-col m-20">
		<h1>Hello {user.email}</h1>
		<div class="p-3">
			<span>Go to:</span>
			<a class="p-1" href="/users">Users</a> /
			<a class="p-1" href="/plants">Plants</a>
		</div>
		</div>
</SignedIn>


<SignedOut let:auth>
	<div class="flex justify-center">
		<form
			class="flex flex-col"
			on:submit|preventDefault={() => signInWithEmailAndPassword(auth, email, password)}
		>
			<Textfield bind:value={email} label="Email" />
			<Textfield bind:value={password} label="Password" type="password" />

			<Button color="secondary" variant="raised" class="my-4">
				<Label>Login</Label>
			</Button>
		</form>
	</div>
</SignedOut>
