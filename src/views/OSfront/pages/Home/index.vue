<template>
    <div class="OSfronthome">
        <!-- 背景渐变图 层级：倒数第1层 -->
        <div class="body_bgimage">
            <BodyBgimg />
        </div>

        <!-- 粒子蒙版 层级：倒数第2层 -->
        <div class="body_particles">
            <ParticlesMask />
        </div>

        <!-- 宫格菜单 层级：最高层 -->
        <el-col :span="24">
            <BodyGridNav />
        </el-col>
        
        <!-- footer 层级：倒数第3层 -->
		<footer class="footer">
    		<el-col :span="24" :xs="0" class="footer-container">
                <ICPmsg />
    		</el-col>
		</footer>
    </div>
</template>

<script>
import BodyBgimg from './pages/BodyBgimg.vue';
import ParticlesMask from '@/@cjui/components/webUI/Particles/circle/index.vue';
import BodyGridNav from './pages/BodyGridNav.vue';
import ICPmsg from '@/components/project/ICPmsg.vue';

export default {
  	name: 'OSfrontHomeIndex',
	components: {
        BodyBgimg,
        ParticlesMask,
		BodyGridNav,
        ICPmsg,
	},
}
</script>

<style lang="scss" scoped>
.OSfronthome {
    width: 100%;
    height: 100%;
    overflow:hidden;
    position: relative;
}

.body_bgimage {
    background: #000000;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.body_particles {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 66;
}

.footer {
  	position: fixed;
  	right: 0;
  	bottom: 0;
  	left: 0;
  	z-index: 77;

    .footer-container {
	    width: 100%;
  	    padding: 8px;
  	    color: #ebebeb;
  	    font-size: 12px;
  	    text-align: center;
  	    background: rgba(0, 0, 0, 0.4);
    }
}
</style>
