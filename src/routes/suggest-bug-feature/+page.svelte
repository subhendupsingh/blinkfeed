<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from '$lib/components/ui/card';
	import PrimaryButton from '$lib/components/common/primary-button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { toast } from '$lib/utils';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Seo from '$lib/components/common/seo.svelte';
	import { SITE_URL } from '$lib/helpers/constants';

    let { data }: { data: PageData } = $props();
    let loading : boolean = $state(false);
    let contact: string|undefined = $state(undefined);
    let message: string|undefined = $state(undefined);
    
    const reportBug = async () => {
        if (!contact) {
            toast('Please enter your email or twitter username', 'error');
            return;
        }

        loading = true;

        const response = await fetch(`/api/suggest-feature`, {
            method: 'POST',
            body: JSON.stringify({
                contact,
                message
            })
        });

        loading = false;

        const data = await response.json() as any;
        
        if (response.ok) {
            contact = undefined;
            toast('Reported successfully', 'success');
        }else{
            toast(data.message, 'error');
        }
    };
</script>

<Seo data= {{
    title: 'Suggest Bug/Feature - BlinkFeed',
    description: 'Report a bug or suggest a new feature to make this tool better for everyone',
    ogImage: 'https://res.cloudinary.com/curead/image/upload/f_auto,q_100/v1741426993/Shootmail/og-image/blinkfeed-og-image_wntpi4.jpg',
    url: `${SITE_URL}/category/suggest-bug-feature`
}} />

<Card.Root>
    <Card.Header>
        <Card.Title>Suggest Bug/Feature</Card.Title>
        <Card.Description>Report a bug or suggest a new feature to make this tool better for everyone</Card.Description>
    </Card.Header>
    <Card.Content class="">
        <div class="flex flex-col gap-6">
            <Input bind:value={contact} placeholder="Email/Twitter username" />
            <Textarea bind:value={message} placeholder="Message" />
        </div>
        <PrimaryButton bind:loading onclick={reportBug} size="lg" class="mt-6 w-full lg:w-auto" type="submit">Submit</PrimaryButton>
    </Card.Content>
</Card.Root>