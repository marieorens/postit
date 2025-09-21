<template>
        <div
            class="postcard border border-gray-200 rounded-lg relative group cursor-pointer"
            @click="onDetails"
            id="contain"
            :style="{ backgroundColor: color }"
        >
            <h5 class="title">{{ title }}</h5>
            <div class="content">{{ formattedContent }}</div>
        </div>
</template>

<script>
export default {
    name: 'PostCard',
    props: {
        title: String,
        content: {
            type: [String, Array],
            default: ''
        },
        color: {
            type: String,
            default: '#7588e8'
        }
    },
    computed: {
        formattedContent() {
            if (!this.content) return '';
            
            if (Array.isArray(this.content)) {
                return this.content.join('\n');
            }
            return this.content;
        }
    },
    methods: {
        onEdit() {
            this.$emit('edit');
        },
        onDetails() {
            this.$emit('details');
        }
    }
}
</script>

<style scoped>

#contain {
    border-radius: 10px;
    padding: 24px 16px 16px 16px;
    background-color: #7588e8;
    box-shadow: 0 2px 8px;
    border: none;
    position: relative;
    transition: box-shadow 0.2s;
}
.postcard:hover {
    box-shadow: 0 4px 16px;
}
.edit-btn {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0.5rem;
    margin: 0;
    cursor: pointer;
}
.title {
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
    text-align: left;
}
.content {
    color: white;
    font-size: 1rem;
    margin: 0;
    text-align: left;
    background: none;
    box-shadow: none;
    padding: 0;
}
.postcard:hover {
    box-shadow: 0 4px 16px;
}
.edit-btn {
    font-size: 1.1rem;
    line-height: 1;
}
.title {
    color: black;
    font-size: 1rem;
}
.content {
    color: black;
}

@media (max-width: 480px) {
    #contain {
        padding: 16px 12px 12px 12px;
        border-radius: 8px;
    }
    
    .title {
        font-size: 0.95rem;
        margin: 0 0 0.4rem 0;
    }
    
    .content {
        font-size: 0.9rem;
        line-height: 1.4;
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    #contain {
        padding: 20px 14px 14px 14px;
    }
    
    .title {
        font-size: 1rem;
    }
    
    .content {
        font-size: 0.95rem;
    }
}

</style>




