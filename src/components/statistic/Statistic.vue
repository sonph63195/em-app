<template>
  <div>
    <Header />
    <main>
      <b-container class="mt-3">
        <b-card no-body>
          <b-tabs pills card align="center">
            <b-tab title="Event" active>
              <Event></Event>
            </b-tab>
            <b-tab title="Candidate">
              <Candidate></Candidate>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-container>
    </main>
  </div>
</template>

<script>
import Header from "../header/Header";
import Event from "./Event";
import Candidate from "./Candidate";

export default {
  components: {
    Header,
    Event,
    Candidate
  }
};
</script>
