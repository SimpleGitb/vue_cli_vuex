<template>
	<div class="pagination">
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40, 50]"
    :page-size="10"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
	</div>
</template>
<script>
export default {
  name: 'pagination',
  data: function () {
    return {
     
    }
  },

  methods: {

  },
  created(){
    
  },
  mounted () {
   
  },

  computed: {
   
  }

}
</script>
<style scoped lang="less">

</style>

