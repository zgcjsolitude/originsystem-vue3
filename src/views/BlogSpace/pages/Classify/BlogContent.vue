<template>
	<div class="BlogClassify">
        {{ tag }}
    </div>
</template>

<script>
import { ref }  from 'vue';

export default {
  	name: 'BlogContent',
	components:{ 
	},
  	data() {
    	return {
            tag: 'classify'
    	};
	},
}
</script>
