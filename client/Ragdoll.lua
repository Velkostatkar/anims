local isInRagdoll = false

Citizen.CreateThread(function()
 while true do
    Citizen.Wait(100)
    if isInRagdoll then
      SetPedToRagdoll(PlayerPedId(), 1000, 1000, 0, 0, 0, 0)
    end
  end
end)

Citizen.CreateThread(function()
    while true do
    Citizen.Wait(10)
    if IsControlJustPressed(2, cfg.RagdollKeybind) and cfg.RagdollEnabled and IsPedOnFoot(PlayerPedId()) then
        if isInRagdoll then
            isInRagdoll = false
        else
            isInRagdoll = true
            Wait(500)
        end
    end
  end
end)

