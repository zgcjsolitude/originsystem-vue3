<template>
    <bs-loading-progress :loading="!Boolean(content)">
	    <div v-html="content" class="markdown-body"></div>
    </bs-loading-progress>
</template> 

<script>

export default {
  	name: 'BlogView',
    props: {
        content: {
            type: String,
            default: ''
        }
    }
}
</script>
