<template>
  <b-card header-tag="header" header-bg-variant="primary" header-text-variant="white">
    <h4 slot="header">Roles</h4>
    <b-card-body>
      <b-container fluid>
        <b-table
          thead-class="header_table"
          :items="statusItems"
          :fields="statusFields"
          :current-page="currentPage"
          :per-page="perPage"
          striped
          bordered
          hover
        >
        
        </b-table>
      </b-container>
    </b-card-body>
  </b-card>
</template>
<script>
export default {};
</script>