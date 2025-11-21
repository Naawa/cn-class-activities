<script lang="ts">
	import { onDestroy } from "svelte";

	let minutes = 0;
	let seconds = 0;

	const tick = () => {
		const now = new Date();

		// Next hour
		const nextHour = new Date(now);
		nextHour.setHours(now.getHours() + 1, 0, 0, 0);

		const diff = nextHour.getTime() - now.getTime();

		minutes = Math.floor(diff / 1000 / 60);
		seconds = Math.floor((diff / 1000) % 60);
	};

	tick();
	const interval = setInterval(tick, 1000);

	onDestroy(() => clearInterval(interval));
</script>

<div class="countdown">
	<div class="group">
		<span class="num">{minutes}</span>
		<span class="label">Min</span>
	</div>

	<div class="spacer"></div>

	<div class="group">
		<span class="num">{seconds}</span>
		<span class="label">Sec</span>
	</div>
</div>

<style>
	.countdown {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 2rem; /* spacing between Min and Sec groups */
		color: white;
		font-family: 'Azo Sans Black';
		margin: 2em;
		margin-top: 3em;
	}

	.group {
		display: flex;
		align-items: baseline;
		gap: 0.3rem; /* spacing between number + label */
		font-family: 'Azo Sans Black';

	}

	.num {
		font-size: 4rem;
		font-weight: 700;
		line-height: 1;
		font-family: 'Azo Sans Black';

	}

	.label {
		font-size: 1.8rem;
		font-weight: 900;
		line-height: 1;
		opacity: 0.9;
		font-family: 'Azo Sans Black';

	}
</style>
