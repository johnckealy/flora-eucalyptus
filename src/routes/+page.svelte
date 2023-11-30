<script>
	import { SignedOut } from 'sveltefire';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';

	let email = '';
	let password = '';
</script>

<h1>This is the home page</h1>

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
