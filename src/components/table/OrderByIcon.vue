<template language="html">
<div>
    <i v-show="state=='all'" class="orderby sort icon" @click="onIconClick()"></i>
    <i v-show="state=='down'" class="orderby sort descending icon" @click="onIconClick()"></i>
    <i v-show="state=='up'" class="orderby sort ascending icon" @click="onIconClick()"></i>
</div>
</template>

<script>
export default {
    props: [
		'title',
        'orderby',
        'current',
        'desc'
    ],
    computed: {
        state() {
            if(this.orderby != this.current) {
                return 'all';
            }
            if(this.desc) {
                return 'down';
            }
            return 'up';
        }
    },
    methods: {
        onIconClick() {
            //this.$dispatch('orderby.click', this);
            this.$parent.eventVm.$emit('orderby.click', this);
        }
    }
}
</script>

<style scoped>
.sort.descending {
	position: relative;
	top: 3px;
}
.sort.descending::before {
	position: absolute;
	display: inline-block;
	top: -3px;
	left: 5px;
}
.sort.ascending {
	position: relative;
	top: 3px;
}
.sort.ascending::before {
	position: absolute;
	display: inline-block;
	top: 3px;
	left: 5px;
}
</style>
