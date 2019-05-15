@PostMapping(value ="/devices", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void  list(@RequestBody List<Device> body) throws IOException {

        System.out.println(body);
}
