<template>
    <div class="modal-overlay">
        <div class="modal-card">
            <div class="modal-header">
                <h3>{{ isEdit ? 'Modifier le post-it' : 'Créer un post-it' }}</h3>
                <button class="close-btn" @click="$emit('close')">×</button>
            </div>
            <form class="modal-form" @submit.prevent="submitForm">
                <label>Titre</label>
                <input type="text" v-model="localTitle" class="modal-input" placeholder="Titre du post-it" required />
                <label>Contenu</label>
                <textarea v-model="localContent" class="modal-input" placeholder="Contenu du post-it" required rows="3"></textarea>
                <button type="submit" class="modal-submit">{{ isEdit ? 'Modifier' : 'Créer' }}</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(55, 88, 249, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal-card {
    background: #fffbe7;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(55,88,249,0.18);
    padding: 2.5rem 2rem 2rem 2rem;
    min-width: 340px;
    max-width: 95vw;
    width: 100%;
    max-width: 500px;
    min-height: 260px;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 2px solid #ffd700;
    margin: 1rem;
}

@media (max-width: 480px) {
    .modal-card {
        padding: 1.5rem 1rem 1rem 1rem;
        min-width: 280px;
        max-width: 90vw;
        border-radius: 12px;
        margin: 0.5rem;
    }
    
    .modal-header h3 {
        font-size: 1.1rem;
    }
    
    .close-btn {
        font-size: 1.5rem;
    }
    
    .modal-input {
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
    }
    
    .modal-submit {
        padding: 0.7rem 0;
        font-size: 1rem;
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    .modal-card {
        padding: 2rem 1.5rem 1.5rem 1.5rem;
        max-width: 85vw;
        border-radius: 15px;
    }
}
.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}
.modal-header h3 {
    font-size: 1.3rem;
    font-weight: bold;
    color: #3758F9;
}
.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: #f44336;
    cursor: pointer;
    line-height: 1;
    padding: 0 0.5rem;
    transition: color 0.2s;
}
.close-btn:hover {
    color: #3758F9;
}
.modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.modal-input {
    border-radius: 8px;
    border: 1.5px solid #bdbdbd;
    padding: 0.7rem 1rem;
    font-size: 1rem;
    background: #fff;
    color: #222;
    outline: none;
    transition: border 0.2s;
}
.modal-input:focus {
    border: 1.5px solid #42b983;
}
.modal-submit {
    background:#3758F9;
    color: #fff;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    padding: 0.8rem 0;
    font-size: 1.1rem;
    font-family: 'Poppins', Courier, monospace;
    margin-top: 0.5rem;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(55,88,249,0.12);
    transition: background 0.2s, color 0.2s;
}
.modal-submit:hover {
    background: #42b983;
    color: black;
}
</style>

<script>
export default {
    name: 'PostModal',
    props: {
        isEdit: Boolean,
        title: String,
        content: String
    },
    data() {
        return {
            localTitle: this.title || '',
            localContent: this.content || ''
        }
    },
    methods: {
        submitForm() {
            const formattedContent = this.localContent.trim();
            this.$emit('submit', { 
                title: this.localTitle.trim(), 
                content: formattedContent
            });
            this.$emit('close');
        }
    },
    watch: {
        title(val) { this.localTitle = val || ''; },
        content(val) { 
            if (Array.isArray(val)) {
                this.localContent = val.join('\n');
            } else {
                this.localContent = val || '';
            }
        }
    }
}
</script>