<script lang='ts'>
	import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { toast } from '$lib/utils';
    import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';
	import { api } from '$lib/helpers/api';
	import type { Category, Subcategory } from '$lib/types';
	import PrimaryButton from '$lib/components/common/primary-button.svelte';
	import Seo from '$lib/components/common/seo.svelte';
	import { SITE_URL } from '$lib/helpers/constants';

    let url: string|undefined = $state(undefined);
    let categories: Category[] = $state([]);
    let selectedCategory: string|undefined = $state(undefined);
    let subcategories: Subcategory[] = $state([]);
    let selectedSubcategory: string|undefined = $state(undefined);
    let category: string|undefined = $state(undefined);
    let subcategory: string|undefined = $state(undefined);
    let isSubmittingFeed: boolean = $state(false);
    let isSubmittingCategory: boolean = $state(false);

    const addRSSFeed = async () => {
        if (!url) {
            toast('Please enter a URL', 'error');
            return;
        };
        
        if (!selectedCategory) {
            toast('Please select a category', 'error');
            return;
        };

        isSubmittingFeed = true;

        const response = await fetch(`/api/feed/add`, {
            method: 'POST',
            body: JSON.stringify({
                url,
                categoryId: selectedCategory ? Number(selectedCategory) : undefined,
                subcategoryId: selectedSubcategory ? Number(selectedSubcategory) : undefined
            })
        });

        isSubmittingFeed = false;

        const data = await response.json() as any;
        
        if (response.ok) {
            url = undefined;
            selectedCategory = undefined;
            selectedSubcategory = undefined;
            toast('Feed added successfully', 'success');
        }else{
            toast(data.message, 'error');
        }
    };

    const getCategories = async () => {
        const response = await api.get<Category[]>(`/category`);
        //console.log(response);
        if(response.error){
            toast(response.error, 'error');
        }
        
        if(response.data){
            categories = response.data;
        }
    }

    const getSubcategories = async () => {
        const response = await api.get<Subcategory[]>(`/category/${selectedCategory}/subcategories`);
        if(response.error){
            toast(response.error, 'error');
        }
        
        if(response.data){
            subcategories = response.data;
        }
    };

    const suggestCatgory = async () => {
        if(!category) {
            toast('Please enter category name', 'error');
            return;
        }

        isSubmittingCategory = true;

        const response = await api.post<Category[]>(`/category/suggest`, {
            category: category,
            subcategory: subcategory
        });

        category = undefined;
        subcategory = undefined;
        isSubmittingCategory = false;
        
        if(response.error){
            toast(response.error, 'error');
        }

        if(response.data){
            toast('Thanks for the suggestion. We will add this soon.', 'success');
        }
    };

    onMount(async () => {
        getCategories();
    });
</script>

<Seo data= {{
    title: 'Add RSS Feed - BlinkFeed',
    description: 'Add a new RSS feed to BlinkFeed',
    ogImage: 'https://res.cloudinary.com/curead/image/upload/f_auto,q_100/v1741426993/Shootmail/og-image/blinkfeed-og-image_wntpi4.jpg',
    url: `${SITE_URL}/add-rss-feed`
}} />

<Card.Root>
    <Card.Header>
        <Card.Title>Add RSS Feed</Card.Title>
        <Card.Description>Enter the URL of the RSS feed you want to add</Card.Description>
    </Card.Header>
    <Card.Content>
        <Input bind:value={url} placeholder="Enter RSS feed URL" />

        <div class="flex flex-col lg:flex-row items-center gap-6 lg:gap-24 mt-8">
            <div class="flex flex-col gap-4 w-full">
                <Label for="category">Select Category<sup class="text-red-500">*</sup></Label>
                <Select.Root onValueChange={getSubcategories}  bind:value={selectedCategory} type="single">
                    <Select.Trigger class="min-w-[200px] w-full">{selectedCategory ? categories.find(c => c.id == Number(selectedCategory))?.name : "Category"}</Select.Trigger>
                    <Select.Content id="category">
                      {#each categories as category}
                        <Select.Item value={category.id+""}>{category.name}</Select.Item>
                      {/each}
                    </Select.Content>
                </Select.Root>
            </div>
    
            <div class="flex flex-col gap-4 w-full">
                <Label for="category">Select Subcategory</Label>
                <Select.Root  bind:value={selectedSubcategory} type="single">
                    <Select.Trigger class="min-w-[200px] w-full">{selectedSubcategory ? subcategories.find(c => c.id == Number(selectedSubcategory))?.name : "Sub Category"}</Select.Trigger>
                    <Select.Content id="category">
                      {#each subcategories as category}
                        <Select.Item value={category.id+""}>{category.name}</Select.Item>
                      {:else}
                         <p class="text-xs p-4 text-muted-foreground">Select category first</p>
                      {/each}
                    </Select.Content>
                </Select.Root>
            </div>
        </div>

        <PrimaryButton bind:loading={isSubmittingFeed} onclick={addRSSFeed} size="lg" class="mt-6 w-full lg:w-auto" type="submit">Add Feed</PrimaryButton>
    </Card.Content>
</Card.Root>


<Card.Root class="mt-10">
    <Card.Header>
        <Card.Title>Suggest Category</Card.Title>
        <Card.Description>Suggest a new category and/or subcategory</Card.Description>
    </Card.Header>
    <Card.Content class="">
        <div class="flex flex-col lg:flex-row gap-4">
            <Input bind:value={category} placeholder="Category" />
            <Input bind:value={subcategory} placeholder="Subcategory" />
        </div>
        <PrimaryButton bind:loading={isSubmittingCategory} onclick={suggestCatgory} size="lg" class="mt-6 w-full lg:w-auto" type="submit">Submit</PrimaryButton>
    </Card.Content>
</Card.Root>