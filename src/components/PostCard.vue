<template>
        <div
            class="postcard border border-gray-200 rounded-lg relative group cursor-pointer"
            @click="onDetails"
            id="contain"
            :style="{ backgroundColor: color }"
        >
            <h5 class="title">{{ title }}</h5>
            <div class="content">{{ truncatedContent }}</div>
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
            
            let content = '';
            if (Array.isArray(this.content)) {
                content = this.content.join('\n');
            } else {
                content = this.content;
            }
            
            return content;
        },
        truncatedContent() {
            const maxLength = 150; // Nombre max de caractères à afficher
            if (this.formattedContent.length <= maxLength) {
                return this.formattedContent;
            }
            return this.formattedContent.slice(0, maxLength) + '...';
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
    min-height: 140px;
    max-height: 200px;
    display: flex;
    flex-direction: column;
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
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.3;
    max-height: 2.6em; 
}
.content {
    color: black;
    font-size: 1rem;
    margin: 0;
    text-align: left;
    background: none;
    box-shadow: none;
    padding: 0;
    flex: 1;
    overflow: hidden;
    line-height: 1.4;
    white-space: pre-wrap;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
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
        min-height: 120px;
        max-height: 180px;
    }
    
    .title {
        font-size: 0.95rem;
        margin: 0 0 0.4rem 0;
        max-height: 2.4em;
    }
    
    .content {
        font-size: 0.9rem;
        line-height: 1.4;
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    #contain {
        padding: 20px 14px 14px 14px;
        min-height: 130px;
        max-height: 190px;
    }
    
    .title {
        font-size: 1rem;
    }
    
    .content {
        font-size: 0.95rem;
    }
}

</style>




