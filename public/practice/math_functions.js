function P(t, b, a) {
    var result = 1/(1 + Math.exp(-a*(t - b)));
    return result;
};

function Q(t, b, a) {
    var result = 1 - P(t, b, a);
    return result;
};

function theta_estimation(vector, t, b, a) {
    var denominator = 0;
    var divisor = 0;

    for (var i = 0; i < vector.length; i++) {
        denominator += a[i]*(vector[i]-P(t, b[i], a[i]));
        divisor += (a[i]*a[i])*(P(t, b[i], a[i])*Q(t, b[i], a[i]));
    };
    
    return Math.round(((t + (denominator/divisor))*100)/100);
};

function new_theta(vector, t, b, a) {
    
    var old_theta = t;
     
    var new_theta = theta_estimation(vector, t, b, a);

    while ( Math.abs(old_theta - new_theta) >= 0.000001) {
        console.log("o" + old_theta);
        console.log("n" + new_theta);

        old_theta = new_theta;
        new_theta = theta_estimation(vector, old_theta, b, a);
    }

    return Math.round((new_theta*100)/100);
}

