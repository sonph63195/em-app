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
            <b-tab title="Sub-Subject Type">
              <ChartSubSubject/>
            </b-tab>
            <b-tab title="Event Status">
              <ChartEventStatus/>
            </b-tab>
            <b-tab title="CampusLink program">
              <ChartCampusLinkprogram/>
            </b-tab>
            <b-tab title="Section status">
              <ChartSectionstatus/>
            </b-tab>
            <b-tab title="Candidate">
              <Candidate/>
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
import ChartSubSubject from "./ChartSubSubject"
import ChartEventStatus from "./ChartEventStatus"
import ChartSectionstatus from "./ChartSectionstatus"
import ChartCampusLinkprogram from "./ChartCampusLinkprogram"

export default {
  components: {
    Header,
    Event,
    Candidate,
    ChartSubSubject,
    ChartEventStatus,
    ChartSectionstatus,
    ChartCampusLinkprogram,
  }
};
</script>
