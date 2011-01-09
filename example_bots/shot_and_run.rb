class ShotAndRun < ScubyWars::Client
  
  def think
    self.fire unless self.fireing?
    self.run unless self.running?
  end
  
end

AndisBot.new("localhost:3000", "Andi").join()