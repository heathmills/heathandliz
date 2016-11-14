// Variable to hold request
var request;

// Bind to the submit event of our form
$("#contact").submit(function(event) {

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // // Fire off the request to /form.php
    // request = $.ajax({
    //     url: "/form.php",
    //     type: "post",
    //     data: serializedData
    // });

    // fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwM4iW4J1jXnRQwW3EyRk9i6Erfo2q6JlobXAeNo3f-J9GnpyVw/exec",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function(response, textStatus, jqXHR) {
        // Log a message to the console
        console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function(jqXHR, textStatus, errorThrown) {
        // Log the error to the console
        console.error(
            "The following error occurred: " +
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function() {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

});