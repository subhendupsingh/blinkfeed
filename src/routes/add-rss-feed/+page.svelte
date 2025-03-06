<script lang='ts'>
	import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { toast } from '$lib/utils';
    import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';
	import type { Category, Subcategory } from '../api/category/types';
	import { api } from '$lib/helpers/api';

    let url: string|undefined = $state(undefined);
    let categories: Category[] = $state([]);
    let selectedCategory: string|undefined = $state(undefined);
    let subcategories: Subcategory[] = $state([]);
    let selectedSubcategory: string|undefined = $state(undefined);

    const addRSSFeed = async () => {
        if (!url) {
            toast('Please enter a URL', 'error');
            return;
        };
        
        if (!selectedCategory) {
            toast('Please select a category', 'error');
            return;
        };

        const response = await fetch(`/api/feed/add`, {
            method: 'POST',
            body: JSON.stringify({
                url,
                categoryId: selectedCategory ? Number(selectedCategory) : undefined,
                subcategoryId: selectedSubcategory ? Number(selectedSubcategory) : undefined
            })
        });

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

    onMount(async () => {
        getCategories();
    });
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>Add RSS Feed</Card.Title>
        <Card.Description>Enter the URL of the RSS feed you want to add</Card.Description>
    </Card.Header>
    <Card.Content>
        <Input bind:value={url} placeholder="Enter RSS feed URL" />

        <div class="flex items-center gap-24 mt-8">
            <div class="flex flex-col gap-4">
                <Label for="category">Select Category<sup class="text-red-500">*</sup></Label>
                <Select.Root onValueChange={getSubcategories}  bind:value={selectedCategory} type="single">
                    <Select.Trigger class="min-w-[200px]">{selectedCategory ? categories.find(c => c.id == Number(selectedCategory))?.name : "Category"}</Select.Trigger>
                    <Select.Content id="category">
                      {#each categories as category}
                        <Select.Item value={category.id+""}>{category.name}</Select.Item>
                      {/each}
                    </Select.Content>
                </Select.Root>
            </div>
    
            <div class="flex flex-col gap-4">
                <Label for="category">Select Subcategory</Label>
                <Select.Root  bind:value={selectedSubcategory} type="single">
                    <Select.Trigger class="min-w-[200px]">{selectedSubcategory ? subcategories.find(c => c.id == Number(selectedSubcategory))?.name : "Sub Category"}</Select.Trigger>
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

        <Button onclick={addRSSFeed} size="lg" class="mt-6" type="submit">Add Feed</Button>
    </Card.Content>
</Card.Root>