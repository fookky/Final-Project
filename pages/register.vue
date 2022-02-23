
<template>
  <div>
    <RegisterForm @sendData="onSubmitted"></RegisterForm>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm'
import axios from 'axios'
export default {
  components: { RegisterForm },
  methods: {
    onSubmitted(postData) {
      axios
        .post(
          'https://research-database-662bb-default-rtdb.asia-southeast1.firebasedatabase.app/users.json',
          postData
        )
        .then((res) => {
          console.log(res)
        })
    },
  },
}
</script>

<style scoped>
</style>