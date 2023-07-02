export default
function link(strings, ...args) {
    strings = [].slice.call(strings);
    const output = [ strings.shift() ];

    while(args.length) {
        output.push(encodeURIComponent(args.shift()));
        output.push(strings.shift());
    }

    return output.join('');
}
