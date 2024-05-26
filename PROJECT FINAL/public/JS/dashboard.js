function fetchWorkouts() {
  $.get("/workouts", function (data) {
    // Clear existing table rows
    $("#workoutTable tbody").empty();

    // Log fetched data for debugging
    console.log("Fetched workouts:", data);

    // Iterate over fetched workouts and append to table
    data.forEach((workout) => {
      const row = `
                <tr>
                    <td>${workout.username}</td>
                    <td>${workout.workoutName}</td>
                    <td>${workout.exercises}</td>
                    <td>${workout.duration}</td>
                    <td><form id="deleteForm" action="/workouts/<%= workout._id %>" method="POST">
                    <input type="hidden" name="_method" value="DELETE">
                    <button class="btn btn-danger addworkout" type="submit">Delete Workout</button>
                    </form>                            
                </td>
                </tr>`;
      $("#workoutTable tbody").append(row);
    });
  }).fail(function (error) {
    console.error("Error fetching workouts:", error);
  });
}

// Call fetchWorkouts when the page loads
$(document).ready(function () {
  fetchWorkouts();
});

$(document).ready(function() {
  $("#deleteForm").on("submit", function(event) {
      event.preventDefault();
      $.ajax({
          url: $(this).attr("action"),
          type: "DELETE",
          success: function(data) {
              // Handle success, e.g., redirect to dashboard
          },
          error: function(xhr, status, error) {
              // Handle error
          }
      });
  });
});

