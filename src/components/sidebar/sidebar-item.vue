<template>
    <div class="sidebar__content-item" :class="{ 'sidebar__content-item_active': checkSelectedId(item.id) }" @click="setSelectedId(item.id)">
        <div class="sidebar__content-item-name">{{ item.name }}</div>
        <div v-if="checkSelectedId(item.id)" class="sidebar__content-item-delete">
            <button class="sidebar__content-item-delete-button" @click.stop="deleteItem(item.id)">Удалить</button>
        </div>  
    </div>
</template>

<script setup lang="ts">
import { useRectangleActions } from '@/store/actions';
import { Rectangle } from '@/types/interfaces';

const { item } = defineProps<{item: Rectangle}>();
const { checkSelectedId, deleteItem, setSelectedId } = useRectangleActions();

</script> 


<style scoped>
.sidebar__content-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    &_active {
        background-color: #42b883;
        border-radius: 5px;
    }
    &-name {
        flex: 1;
        font-size: 16px;
        font-weight: 600;
        color: #fff;    
    }

    &-delete {
    display: flex;
    justify-content: flex-end;
        &-button {
            padding: 5px 10px;
            font-size: 16px;
            font-weight: 600;
            color: #fff;
            background-color: #42b883;
            border-radius: 5px;
        }
    }

}
</style>