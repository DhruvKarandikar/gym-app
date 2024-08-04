function color_generator(length){
    let colors = [];
    for(let i = 0; i <= length; i++){
        let red = Math.floor((Math.random() * 255) + 1);
        let green = Math.floor((Math.random() * 255) + 1);
        let yellow = Math.floor((Math.random() * 255) + 1);
        
        let random_color = `rgba(${red}, ${green}, ${yellow})`;
        colors.push(random_color);
    }
    return colors;
}

export default color_generator