<script>
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

	let email = '';
	let password = '';

	async function loginWithPassword() {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			console.log(user);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="flex justify-center">
	<form class="flex flex-col" on:submit|preventDefault={loginWithPassword}>
		<label for="email">Email</label>
		<input class="ring p-2" type="email" id="email" bind:value={email} />
		<label for="password">Password</label>
		<input class="ring p-2" type="password" id="password" bind:value={password} />
		<button class="ring bg-blue-600" type="submit">Login</button>
	</form>
</div>
