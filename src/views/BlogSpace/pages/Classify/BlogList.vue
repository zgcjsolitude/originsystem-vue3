<template>
	<div class="BlogClassify">
        {{ tag }}
    </div>
</template>

<script>
import { ref }  from 'vue';

export default {
  	name: 'BlogList',
	components:{ 
	},
  	data() {
    	return {
            tag: 'classify'
    	};
	},
}
</script>
